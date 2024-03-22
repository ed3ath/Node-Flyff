QUEST_CLOWNTEMPLE = {
	title = 'IDS_PROPQUEST_DUNGEONANDPK_INC_000584',
	character = 'MaSa_SainMayor',
	end_character = 'MaSa_SainMayor',
	start_requirements = {
		min_level = 45,
		max_level = 70,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR' },
		previous_quest = 'QUEST_DARKGATE',
	},
	rewards = {
		gold = 0,
		exp = 319984,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_IBLRECORD', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000585',
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000586',
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000587',
		},
		begin_yes = {
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000588',
		},
		begin_no = {
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000589',
		},
		completed = {
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000590',
		},
		not_finished = {
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000615',
		},
	}
}
