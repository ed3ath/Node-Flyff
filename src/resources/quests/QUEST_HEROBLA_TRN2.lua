QUEST_HEROBLA_TRN2 = {
	title = 'IDS_PROPQUEST_INC_001435',
	character = 'MaDa_Corel',
	end_character = 'MaFl_Guabrill',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_MERCENARY' },
		previous_quest = 'QUEST_HEROBLA_TRN1',
	},
	rewards = {
		gold = 0,
		exp = 0,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_EARRHEREN', quantity = 1, sex = 'Any', remove = false },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001436',
			'IDS_PROPQUEST_INC_001437',
			'IDS_PROPQUEST_INC_001438',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001439',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001440',
		},
		completed = {
			'IDS_PROPQUEST_INC_001441',
			'IDS_PROPQUEST_INC_001442',
			'IDS_PROPQUEST_INC_001443',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001444',
		},
	}
}
