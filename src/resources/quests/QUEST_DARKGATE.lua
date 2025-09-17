QUEST_DARKGATE = {
	title = 'IDS_PROPQUEST_DUNGEONANDPK_INC_000572',
	character = 'MaSa_SainMayor',
	end_character = 'MaSa_SainMayor',
	start_requirements = {
		min_level = 45,
		max_level = 70,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 200796,
	},
	end_conditions = {
		patrols = {
			{ map = 'WI_WORLD_MADRIGAL', left = 8606, top = 2172, right = 8657, bottom = 2158 },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000573',
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000574',
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000575',
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000576',
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000577',
		},
		begin_yes = {
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000578',
		},
		begin_no = {
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000579',
		},
		completed = {
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000580',
		},
		not_finished = {
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000581',
		},
	}
}
