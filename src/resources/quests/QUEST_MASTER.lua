QUEST_MASTER = {
	title = 'IDS_PROPQUEST_INC_002055',
	character = 'MaDa_RedRobeGirl',
	end_character = 'MaDa_RedRobeGirl',
	start_requirements = {
		min_level = 120,
		max_level = 120,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_CRUETMUF', quantity = 10, sex = 'Any', remove = true },
			{ id = 'II_GEN_GEM_GEM_SHIFTPOP', quantity = 5, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002056',
			'IDS_PROPQUEST_INC_002057',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002058',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002059',
		},
		completed = {
			'IDS_PROPQUEST_INC_002060',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002061',
		},
	}
}

--
-- Returns the job reward based on the player's job.
--
function QUEST_MASTER:change_job_reward(player)
	local master_jobs = {
		[Jobs.JOB_KNIGHT] = Jobs.JOB_KNIGHT_MASTER,
		[Jobs.JOB_BLADE] = Jobs.JOB_BLADE_MASTER,
		[Jobs.JOB_BILLPOSTER] = Jobs.JOB_BILLPOSTER_MASTER,
		[Jobs.JOB_RINGMASTER] = Jobs.JOB_RINGMASTER_MASTER,
		[Jobs.JOB_JESTER] = Jobs.JOB_JESTER_MASTER,
		[Jobs.JOB_RANGER] = Jobs.JOB_RANGER_MASTER,
		[Jobs.JOB_PSYCHIKEEPER] = Jobs.JOB_PSYCHIKEEPER_MASTER,
		[Jobs.JOB_ELEMENTOR] = Jobs.JOB_ELEMENTOR_MASTER,
	}

	return master_jobs[player.PlayerData.JobId] or -1
end