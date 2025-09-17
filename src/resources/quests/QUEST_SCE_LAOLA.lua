QUEST_SCE_LAOLA = {
	title = 'IDS_PROPQUEST_SCENARIO_INC_000441',
	character = 'MaDa_Laloa',
	end_character = 'MaDa_Laloa',
	start_requirements = {
		min_level = 20,
		max_level = 129,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = 'QUEST_SCE_MYSTGEM',
	},
	rewards = {
		gold = 0,
		exp = 0,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_MYSTGEMB', quantity = 1, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_QUE_MYSTGEMR', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_SCENARIO_INC_000442',
			'IDS_PROPQUEST_SCENARIO_INC_000443',
			'IDS_PROPQUEST_SCENARIO_INC_000444',
			'IDS_PROPQUEST_SCENARIO_INC_000445',
		},
		begin_yes = {
			'IDS_PROPQUEST_SCENARIO_INC_000446',
		},
		begin_no = {
			'IDS_PROPQUEST_SCENARIO_INC_000447',
		},
		completed = {
			'IDS_PROPQUEST_SCENARIO_INC_000448',
		},
		not_finished = {
			'IDS_PROPQUEST_SCENARIO_INC_000449',
		},
	}
}
