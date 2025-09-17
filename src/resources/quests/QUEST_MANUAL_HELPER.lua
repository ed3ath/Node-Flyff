QUEST_MANUAL_HELPER = {
	title = 'IDS_PROPQUEST_INC_000881',
	character = 'MaFl_Is',
	end_character = 'MaFl_Is',
	start_requirements = {
		min_level = 20,
		max_level = 25,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 784,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_LES2MANU', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000882',
			'IDS_PROPQUEST_INC_000883',
			'IDS_PROPQUEST_INC_000884',
			'IDS_PROPQUEST_INC_000885',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000886',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000887',
		},
		completed = {
			'IDS_PROPQUEST_INC_000888',
			'IDS_PROPQUEST_INC_000889',
			'IDS_PROPQUEST_INC_000890',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000891',
		},
	}
}
